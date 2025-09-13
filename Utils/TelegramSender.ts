import axios from "axios";
import { Console } from "./Console";
import Logger from "./Logger";
import fs from 'fs';
import FormData from 'form-data';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";


class TelegramSender {

    // private static token: string = '7476071117:AAEugz-3Iwo-_P8EDBpR3S1xKK2ZQjnE0uU';

    private static token: string = '7735009620:AAFPp3ewn7RnE3ZoPU3DHyKJWfO0r3GE94g';
    private static chat_id: string = '-1002496822245';
    // pr TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

    public static async send(message: string): Promise<boolean> {

        try {

            await axios.post(`https://api.telegram.org/bot${TelegramSender.token}/sendMessage`, {
                chat_id: TelegramSender.chat_id,
                text: message,
                parse_mode: "HTML"
            });

            return true;
        }
        catch (e: any) {
            await Logger.write('../Logs/LoggerBot.txt', 'Can not send message TELEGRAMM');
            return false;
        }
    }

    public static async sendPhoto(path: string, caption: string): Promise<void> {
        try {

            if (fs.existsSync(path)) {

                Console.log(`[+] File is exist ${path}`);

                const form = new FormData();
                form.append('chat_id', TelegramSender.chat_id);
                form.append('caption', caption);
                form.append('photo', fs.createReadStream(path));

                const response = await axios.post(`https://api.telegram.org/bot${TelegramSender.token}/sendPhoto`, form, {
                    headers: {
                        ...form.getHeaders(),
                    },
                });
            } else {
                Console.log(`[+] File is not exist ${path}`);
                TelegramSender.send(caption);
            }

        }
        catch (e: any) {
            Console.error(e)
            await Logger.write('../Logs/LoggerBot.txt', 'Can not send screen shots TELEGRAMM');
        }
    }

}
export default TelegramSender;

// const data_lead = `
// СООБЩЕНИЕ ОТ БОТА
// Откуда: TEST
// Страна виньетки: TEST
// ID лида BOT TEST 
// Email: TEST
// Период виньетки: TEST
// Тип авто:TEST
// Страна ТС:TEST

// `;

// TelegramSender.sendPhoto('../Data/screens/screen_2.png', data_lead);