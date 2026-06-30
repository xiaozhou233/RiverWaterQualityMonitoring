# stm32f103c8t6

## ST7735 屏幕接线
| 屏幕引脚 | 连接                    |
| ---- | ----------------------- |
| GND  | GND                     |
| VCC  | 3.3V                    |
| SCL  | SPI_SCK                 |
| SDA  | SPI_MOSI                |
| DC   | GPIO（必须）                |
| RES  | GPIO（推荐）或接 3.3V         |
| CS   | **直接接 GND**（可省一个 GPIO）  |
| BLK  | 3.3V（常亮）或 PWM GPIO（调亮度） |

## 致谢
stm32-st7735 https://github.com/afiskon/stm32-st7735
