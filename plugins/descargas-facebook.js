 import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*${emojis} Ingresa el link del video de Facebook.*`, m, rcanal);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*❌ Error al obtener el video, verifique que el enlace sea correcto*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*⚠️ No se encontraron resultados.*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, '*❌ Error al enviar el video de Facebook*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*⚠️ No se encontró una resolución adecuada.*', m);
  }

  await m.react('✅');
  let video = data.url;
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: '> ${dev}', fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: fkontak });
  } catch (error) {
    return conn.reply(m.chat, '*⚠️ La URL del vídeo está corrompida por lo cual no fue posible enviar el vídeo.*', m, rcanal);
  await m.react('❌');
  }
};

handler.help = ['facebook'];
handler.tags = ['descargas']
handler.command = /^(fb|facebook|fbdl)$/i;

export default handler;                                                                                                                                                                                                                              