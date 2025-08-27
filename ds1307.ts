/**
* makecode DS1307 RTC Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

/**
 * DS1307 block
 */
//% weight=20 color=#8010f0 icon="\uf017" block="Horloge DS1307"
namespace DS1307 {
    let DS1307_I2C_ADDR = 104;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    let DS1307_REG_RAM = 8

    /**
     * écrire un registre du DS1307
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    /**
     * lire un registre du DS1307
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convertir Hex → Décimal
     */
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }

    /**
     * convertir Décimal → Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * démarrer la RTC (reprendre)
     */
    //% blockId="DS1307_START" block="démarrer"
    //% weight=52 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function start() {
        let t = getSecond()
        setSecond(t & 0x7f)
    }

    /**
     * mettre en pause la RTC
     */
    //% blockId="DS1307_STOP" block="pause"
    //% weight=51 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function stop() {
        let t = getSecond()
        setSecond(t | 0x80)
    }

    /**
     * lire l'année
     */
    //% blockId="DS1307_GET_YEAR" block="année"
    //% weight=99 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getYear(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_YEAR)), 99) + 2000
    }

    /**
     * régler l'année
     * @param dat Année à régler, ex: 2018
     */
    //% blockId="DS1307_SET_YEAR" block="régler année %dat"
    //% weight=69 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function setYear(dat: number): void {
        setReg(DS1307_REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * lire le mois
     */
    //% blockId="DS1307_GET_MONTH" block="mois"
    //% weight=98 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getMonth(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_MONTH)), 12), 1)
    }

    /**
     * régler le mois
     * @param dat Mois à régler, ex: 2
     */
    //% blockId="DS1307_SET_MONTH" block="régler mois %dat"
    //% weight=68 blockGap=8
    //% dat.min=1 dat.max=12
    //% parts=DS1307 trackArgs=0
    export function setMonth(dat: number): void {
        setReg(DS1307_REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * lire le jour (du mois)
     */
    //% blockId="DS1307_GET_DAY" block="jour"
    //% weight=97 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getDay(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_DAY)), 31), 1)
    }

    /**
     * régler le jour (du mois)
     * @param dat Jour à régler, ex: 15
     */
    //% blockId="DS1307_SET_DAY" block="régler jour %dat"
    //% weight=67 blockGap=8
    //% dat.min=1 dat.max=31
    //% parts=DS1307 trackArgs=0
    export function setDay(dat: number): void {
        setReg(DS1307_REG_DAY, DecToHex(dat % 32))
    }

    /**
     * lire le jour de la semaine
     */
    //% blockId="DS1307_GET_WEEKDAY" block="jour de la semaine"
    //% weight=96 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getWeekday(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_WEEKDAY)), 7), 1)
    }

    /**
     * régler le jour de la semaine
     * @param dat Semaine 1..7
     */
    //% blockId="DS1307_SET_WEEKDAY" block="régler jour de la semaine %dat"
    //% weight=66 blockGap=8
    //% dat.min=1 dat.max=7
    //% parts=DS1307 trackArgs=0
    export function setWeekday(dat: number): void {
        setReg(DS1307_REG_WEEKDAY, DecToHex(dat % 8))
    }

    /**
     * lire l'heure
     */
    //% blockId="DS1307_GET_HOUR" block="heure"
    //% weight=95 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getHour(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_HOUR)), 23)
    }

    /**
     * régler l'heure
     * @param dat Heure 0..23
     */
    //% blockId="DS1307_SET_HOUR" block="régler heure %dat"
    //% weight=65 blockGap=8
    //% dat.min=0 dat.max=23
    //% parts=DS1307 trackArgs=0
    export function setHour(dat: number): void {
        setReg(DS1307_REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * lire la minute
     */
    //% blockId="DS1307_GET_MINUTE" block="minute"
    //% weight=94 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getMinute(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_MINUTE)), 59)
    }

    /**
     * régler la minute
     * @param dat Minute 0..59
     */
    //% blockId="DS1307_SET_MINUTE" block="régler minute %dat"
    //% weight=64 blockGap=8
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setMinute(dat: number): void {
        setReg(DS1307_REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * lire la seconde
     */
    //% blockId="DS1307_GET_SECOND" block="seconde"
    //% weight=93 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getSecond(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_SECOND)), 59)
    }

    /**
     * régler la seconde
     * @param dat Seconde 0..59
     */
    //% blockId="DS1307_SET_SECOND" block="régler seconde %dat"
    //% weight=63 blockGap
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setSecond(dat: number): void {
        setReg(DS1307_REG_SECOND, DecToHex(dat % 60))
    }

    /**
     * régler date et heure (tout-en-un)
     * @param year Année ex: 2018
     * @param month Mois ex: 2
     * @param day Jour ex: 15
     * @param weekday Jour de semaine ex: 4
     * @param hour Heure ex: 0
     * @param minute Minute ex: 0
     * @param second Seconde ex: 0
     */
    //% blockId="DS1307_SET_DATETIME" block="régler année %year|mois %month|jour %day|jour de la semaine %weekday|heure %hour|minute %minute|seconde %second"
    //% weight=60 blockGap
    //% parts=DS1307 trackArgs=0
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = DS1307_REG_SECOND;
        buf[1] = DecToHex(second % 60);
        buf[2] = DecToHex(minute % 60);
        buf[3] = DecToHex(hour % 24);
        buf[4] = DecToHex(weekday % 8);
        buf[5] = DecToHex(day % 32);
        buf[6] = DecToHex(month % 13);
        buf[7] = DecToHex(year % 100);
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf)
    }
}
