/*
 * turbidity.h
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#ifndef DRIVERS_TURBIDITY_TURBIDITY_H_
#define DRIVERS_TURBIDITY_TURBIDITY_H_

#include <stdint.h>

typedef struct
{
    float voltage;   // 电压
    float ntu;       // 浊度
} TURBIDITY_Data_t;


void TURBIDITY_Init(void);

void TURBIDITY_Calc(uint16_t adc, TURBIDITY_Data_t *out);


#endif /* DRIVERS_TURBIDITY_TURBIDITY_H_ */
