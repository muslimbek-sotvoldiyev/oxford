const TELEGRAM_BOT_TOKEN = "7521209462:AAFe-WuMsoyO9E81va8ZD0hpobOd1D2JRSY"
const TELEGRAM_CHAT_ID = "1792653992"


export async function sendToTelegram(data) {

  const message = `
🎓 *Yangi o'quvchi ro'yxatdan o'tdi!*

👤 *Ism:* ${data.firstname}
👤 *Familiya:* ${data.lastname}
🔢 *Yosh:* ${data.age}
📱 *Telefon:* ${data.phone}
📚 *Tanlangan kurs:* ${data.course}
  `


  console.log("Sending to Telegram:", message)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`);
  }
  
}

