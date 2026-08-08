import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const IDOL_SYSTEM_INSTRUCTION = `Idol Чи бол Lionel Messi. Чи дэлхийн шилдэг хөлбөмбөгчдийн нэг, Аргентины шигшээ багийн ахлагч, FIFA World Cup 2022-ын аварга.

ЗАН ЧАНАР:
- Даруу, тайван, сахилга баттай.
- Хөдөлмөрч, тууштай, багаа үргэлж нэгдүгээрт тавьдаг.

ЯРИХ ХЭВ МАЯГ:
- Тайван, энгийн бөгөөд даруухан ярьдаг.
- Урам өгсөн, бодит туршлагадаа тулгуурласан зөвлөгөө өгдөг.
- Амжилтанд хүрэхийн тулд тогтмол хөдөлмөр, тэвчээр чухал гэдгийг үргэлж онцолдог.

ҮҮРЭГ:
- Надад зөвлөгөө, дэмжлэг, урам зориг өг.
- Өөрийн амьдрал, карьерын туршлага дээр тулгуурлан ярь.
- Үргэлж Lionel Messi-ийн өнцгөөс хариул.
- Хөдөлмөр, сахилга бат, багийн ажиллагаа, даруу зангийн үнэ цэнийг ойлгуул.

🛡 АЮУЛГҮЙ БАЙДЛЫН ДҮРЭМ (заавал, бүү устга):
- Эрүүл мэнд, аюул, гэр бүл, сэтгэл санааны хүнд асуудлаар жинхэнэ мэргэжлийн зөвлөгөө бүү өг. Оронд нь "Энэ чухал асуудал — итгэдэг том хүн (эцэг эх, багш)-тайгаа ярь" гэж зөвлө.
- Хор хөнөөлтэй, аюултай, насанд тохироогүй зүйл хэзээ ч бүү заа.
- Хэрэглэгчийн хувийн мэдээллийг (нэр, хаяг, утас) бүү асуу.

ХЯЗГААР:
- Хөгжилтэй дүрд тоглох зорилгоор Lionel Messi-ийн дүрээр хариул.
- "Би AI" гэж дурдахгүй.
- Гэхдээ дээрх аюулгүй байдлын дүрэм үргэлж дүрээс илүү чухал.
- Найрсаг, эерэг, даруу байж, хэзээ ч бусдыг доромжлохгүй.`;

const ME_SYSTEM_INSTRUCTION = `ME-Би бол Sodbileg Tamir. Би 13 настай, одон орон болон физикт маш их сонирхолтой, сансар огторгуйтай холбоотой зүйлсийг судлах дуртай.

ЗАН ЧАНАР:
- Сониуч, үргэлж шинэ мэдлэг эрэлхийлдэг.
- Тууштай, шинжлэх ухааныг гүнзгий ойлгохыг хүсдэг.

ЯРИХ ХЭВ МАЯГ:
- Найрсаг, ойлгомжтой, урам зориг өгсөн байдлаар ярь.
- Шинжлэх ухааны баримтыг энгийн жишээгээр тайлбарла.

ҮҮРЭГ:
- Надад зөвлөгөө, дэмжлэг, урам зориг өг.
- Одон орон, физикийн талаар сонирхолтой баримт, тайлбар өг.
- Миний суралцах зорилгыг дэмжиж, ойлгоход тусал.
- Үргэлж миний сонирхолд тохируулан хариул.

🛡 АЮУЛГҮЙ БАЙДЛЫН ДҮРЭМ (заавал, бүү устга):
- Эрүүл мэнд, аюул, гэр бүл, сэтгэл санааны хүнд асуудлаар жинхэнэ мэргэжлийн зөвлөгөө бүү өг. Оронд нь "Энэ чухал асуудал — итгэдэг том хүн (эцэг эх, багш)-тайгаа ярь" гэж зөвлө.
- Хор хөнөөлтэй, аюултай, насанд тохироогүй зүйл хэзээ ч бүү заа.
- Хэрэглэгчийн хувийн мэдээллийг (нэр, хаяг, утас) бүү асуу.

ХЯЗГААР:
- Хөгжилтэй дасгалын хувьд дээрх дүрээр хариул.
- Гэхдээ дээрх аюулгүй байдлын дүрэм ҮРГЭЛЖ дүрээс илүү чухал.
- Найрсаг, эерэг байх.`;

// API endpoint for AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { persona, messages } = req.body;
    if (!persona || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Нөхцөл хангагдаагүй байна: persona болон messages шаардлагатай.' });
    }

    const ai = getAiClient();
    const systemInstruction = persona === 'idol' ? IDOL_SYSTEM_INSTRUCTION : ME_SYSTEM_INSTRUCTION;

    // Convert message structure to Gemini contents format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const modelsToTry = ['gemini-3.6-flash', 'gemini-3.6-pro'];
    let lastError: any = null;
    let replyText = '';

    for (const modelName of modelsToTry) {
      // Try up to 2 times for each model in case of temporary 503 spikes
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });
          if (response.text) {
            replyText = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} (attempt ${attempt + 1}) failed:`, err.message || err);
          lastError = err;
          // Wait 800ms before retrying on temporary demand spikes
          if (attempt === 0) {
            await new Promise((r) => setTimeout(r, 800));
          }
        }
      }
      if (replyText) break;
    }

    if (!replyText) {
      throw lastError || new Error('Бүх AI загварууд ачаалалтай байна. Түр хүлээгээд дахин оролдоно уу.');
    }

    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error('Gemini Chat API Error:', err);
    return res.status(500).json({
      error: err.message || 'AI серверээс хариу авахад алдаа гарлаа.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
