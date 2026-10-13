import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app=express(), port=process.env.PORT||3000, dir=path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({limit:"1mb"})); app.use(express.static(dir));
app.post("/api/summarize",async(req,res)=>{try{
 if(!process.env.OPENAI_API_KEY)return res.status(500).json({error:"OPENAI_API_KEY belum diatur pada server."});
 const {transcript,topic="",sourceUrl="",length="sedang"}=req.body||{};
 if(typeof transcript!=="string"||transcript.trim().length<30)return res.status(400).json({error:"Teks terlalu pendek. Tempel transkrip/materi yang lebih lengkap."});
 if(transcript.length>80000)return res.status(413).json({error:"Teks terlalu panjang. Bagi materi menjadi beberapa bagian."});
 const detail={singkat:"Ringkas dalam 5-8 poin utama.",sedang:"Buat rangkuman sistematis dengan subjudul, poin penting, istilah kunci, dan kesimpulan.",detail:"Buat rangkuman terperinci untuk belajar dengan subjudul, poin penting, istilah/definisi, contoh yang didukung teks, dan kesimpulan."}[length]||"Buat rangkuman sistematis.";
 const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
 const out=await client.responses.create({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",instructions:"Kamu asisten belajar berbahasa Indonesia untuk pelajar SMP. Ringkas hanya berdasarkan sumber yang diberikan, jangan mengarang fakta. Gunakan bahasa sederhana, judul, subjudul, bullet, istilah penting, dan kesimpulan.",input:`Topik: ${topic||"Tidak disebutkan"}\nURL sumber: ${sourceUrl||"Tidak disediakan"}\nInstruksi: ${detail}\n\nTeks sumber:\n${transcript.trim()}`});
 res.json({summary:out.output_text||"AI tidak mengembalikan teks. Coba lagi."});
 }catch(e){console.error(e?.message||e);res.status(500).json({error:"Gagal merangkum. Periksa API key, kuota API, dan koneksi server."})}});
app.listen(port,()=>console.log(`Websiter AI berjalan di http://localhost:${port}`));
