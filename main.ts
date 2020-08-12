//% weight=0 color=#FFBA3B icon="\uf0ad" block="Microbittopocket"
namespace microbittopocket {
     let iii=1
     let ssid1=""
     let pass1=""
     let mode2=1
     export enum digitalpin {

        D2 = 2,
        D5 = 5,
        D12 = 12,
        D13 = 13,
        D14 = 14,
        D15 = 15,
        D16 = 16,
        D17 = 17,
        D18 = 18,
        D19 = 19,
        D23 = 23,
        D25 = 25,
        D26 = 26,
        D27 = 27
      }
      export enum analogpin {
        D32 = 32,
        D33 = 33,
        D34 = 34,
        D35 = 35,
        D36 = 36,
        D39 = 39
     }
      
     
      export enum value555 {
        field1 = 1 ,
        field2 = 2,
        field3 = 3,
        field4 = 4,
        field5 = 5,
        field6 = 6,
        field7 = 7,
        field8 = 8
     }
      
      

      export enum type {
        INPUT = 2,
        OUTPUT = 1
     }
     export enum value {
        HIGH = 1,
        LOW = 0
     }

     export enum mode {
        STA = 1,
        AP = 0
     }
        //% group="1.Setup"  
    //% blockId=setMicrobit block="Initialize Microbit |TX %tx|RX %rx|Baud rate %baudrate "
    //% tx.defl=SerialPin.P0
    //% rx.defl=SerialPin.P1
    //% weight=101
    //% blockExternalInputs = 1
    export function setMicrobit(tx: SerialPin, rx: SerialPin, baudrate: BaudRate) {
        serial.redirect(
            tx,
            rx,
            baudrate
        )
        basic.pause(1000)
    }
    //% group="1.Setup"
    //% blockId=setWiFi block="Set ESP32 | SSID %SSID| Pass %PASS| Mode %mode1 "
    //% weight=101
    //% blockExternalInputs = 1
    export function setWiFi(SSID: string, PASS: string, mode1: mode) {
        ssid1=SSID
        pass1=PASS
        mode2=mode1
    }
    
    function check()
    {  
        if (iii==1 && ssid1!="")
        {
            let y
            for(y=0;y<3;y++)
            {
                  serial.writeLine("setwifi="+ssid1+","+pass1+","+mode2+",1\\n")  
                  basic.pause(3000)
            }
            iii=iii+1
        }
    }
    //% group="2.ESP32_Control"  
    //% blockId=setpinmode1 block="Set ESP32 digital pin %pin | for %XY"
    //% weight=101
    export function setpinmode1(pin: digitalpin, XY: type):void {
       serial.writeLine("pinMode="+pin.toString()+","+XY.toString()+"\\n")    
    }
     
    //% group="2.ESP32_Control" 
    //% blockId=setdigital1 block="Set ESP32 digital pin  %pin | value to %XY"
    //% weight=101
    export function setdigital1(pin: digitalpin, XY: value):void {
        serial.writeLine("digitalWrite="+pin.toString()+","+XY.toString()+"\\n")    
    }
    //% group="2.ESP32_Control"     
    //% blockId=setdigital2 block="Set ESP32 PWM pin  %pin | value to %XY"
    //% weight=101
    export function setdigital2(pin: digitalpin, XY: number):void {
        serial.writeLine("analogWrite="+pin.toString()+","+XY.toString()+"\\n")    
    }
    //% group="2.ESP32_Control" 
    //% blockId=setdigital3 block="Read ESP32 digital pin  %pin value"
    //% weight=101
    export function setdigital3(pin: digitalpin):number {
        serial.writeLine("digitalRead="+pin.toString()+"\\n")
        basic.pause(10)
        let a=serial.readString()
        return parseFloat(a);
    }
    //% group="2.ESP32_Control"
    //% blockId=setdigital4 block="Read ESP32 analog pin  %pin value"
    //% weight=101 
    export function setdigital4(pin: analogpin):number {
        serial.writeLine("analogRead="+pin.toString()+"\\n")
        basic.pause(10)
        let a=serial.readString()
        a=a.substr(0, a.length - 2)
        return parseFloat(a)
    }   
    //% group="3.Thingspeak"      
    //% blockId=thingspeak1 block="Connect to Thingspeak key %key | Write Field1 value %value1 "
    //% weight=101 
    export function thingspeak1(key:string, value1: string) {
        check()
        serial.writeLine("t\="+key+","+value1+"\\n")
        basic.pause(4000)
    }
    //% group="3.Thingspeak"            
    //% blockId=thingspeak4 
    //% block="Connect to Thingspeak key %key | Write Fields value | Field1 value %value1 || Field2 value %value2 Field3 value %value3 Field4 value %value4 Field5 value %value5 Field6 value %value6 Field7 value %value7"
    //% weight=101  
    //% blockExternalInputs=1
    export function thingspeak4(key:string, value1: number, value2?:number, value3?:number, value4?:number, value5?:number, value6?:number, value7?:number) {    
        check()
        let b=""
        let i
        let value12:number[]=[value1,value2,value3,value4,value5,value6,value7]
        for (i=0;i<7;i++)
        {
              if (i==0)
              {
                    b=value12[0].toString()
              }else if (value12[i]!=null)
              {
                    let c=i+1
                    b=b+"\&field"+c.toString()+"="+value12[i].toString()
              }
        }
        serial.writeLine("t\="+key+","+b+"\\n")
        basic.pause(8000)
    }
    //% group="3.Thingspeak"      
    //% blockId=thingspeak2 block="Connect to Thingspeak key %key | Write Fields value %value1 "
    //% weight=101
    export function thingspeak2(key:string, value1: number[]) {
        check()
        let a=value1.length
        let b=""
        let i
        for (i=0;i<a;i++)
        {
              if (i==0)
              {
                    b=value1[0].toString()
              }else
              {
                    let c=i+1
                    b=b+"\&field"+c.toString()+"="+value1[i].toString()
              }
        }
        serial.writeLine("t\="+key+","+b+"\\n")
        basic.pause(8000)
    }

      
        //% group="3.Thingspeak"  
     //% blockId=thingspeak3 block="Connect to Thingspeak Channel ID %key | Read %value1 value"
    //% weight=101
    export function thingspeak3(key:number, value1: value555): number {
        check()
        serial.writeLine("tt="+convertToText(key)+","+convertToText(value1)+",1"+"\\n")
        basic.pause(500)
        let a=serial.readString()
        basic.pause(500)
        return parseInt(a)

    }     
      
    //% group="4.IFTTT"  
    //% blockId=ifttt1 block="Connect to IFTTT | API key %key | Event %event | Value1 %value1 | Value2 %value2 | Value3 %value3 "
    //% weight=101 blockExternalInputs = 1 blockGap=1
    export function ifttt1(key: string, event: string, value1: string, value2: string, value3: string) {
          check()
          serial.writeLine("ifttt="+key+","+event+","+"value1="+value1+"&value2="+value2+"&value3="+value3+",1\\n")
    }   
        //% group="RFID"
    //% blockId=rfidid block="read arduino rfid id"
    //% weight=101 advanced=true
    export function rfidid():string {
        serial.writeLine("rfidid="+"\\n")
        basic.pause(10)
        let a=serial.readString()
        a=a.substr(0, a.length - 2)
        return a
    }   
      
}
