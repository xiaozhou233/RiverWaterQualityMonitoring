# stm32f103c8t6

## ST7735 屏幕接线
| 屏幕引脚 | 连接                    |
| ---- | ----------------------- |
| GND  | GND                     |
| VCC  | 3.3V                    |
| SCL  | (PA5)SPI_SCK                 |
| SDA  | (PA7)SPI_MOSI                |
| DC   | (PB11)GPIO（必须）                |
| RES  | (PB12)GPIO（推荐）或接 3.3V         |
| CS   | (PB10)GPIO  |
| BLK  | 3.3V（常亮）或 PWM GPIO（调亮度） |


## ADC 接线
PA0 - PH
PA1 = TDS
PA4 = Turbidity

## UART 接线
PA9 - USART1_TX
PA10 - USART1_RX
PA2 - USART2_TX
PA3 - USART2_RX


## 致谢
stm32-st7735 https://github.com/afiskon/stm32-st7735
