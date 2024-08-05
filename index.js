// Import required modules
import fetch from 'node-fetch'
import TelegramBot from 'node-telegram-bot-api'

const TOKEN = '7028225478:AAGJCVgW6EkIuogTDy5Y-nr7oyZmbgF4loU'
const CHAT_ID = '5577209891' // Your Telegram chat ID
// Create a bot instance
const bot = new TelegramBot(TOKEN)
async function fetchAndSendNews() {
	try {
		const response = await fetch('https://kun.uz/news/list?f=latest&l=5', {
			headers: {
				'Content-Type': 'application/json',
				'x-requested-with': 'XMLHttpRequest',
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		const newsTitles = data.news.map(newsItem => newsItem.title)
		for (const title of newsTitles) {
			await bot.sendMessage(CHAT_ID, title)
		}
	} catch (error) {
		console.error('Error fetching or sending news:', error)
	}
}

fetchAndSendNews()
