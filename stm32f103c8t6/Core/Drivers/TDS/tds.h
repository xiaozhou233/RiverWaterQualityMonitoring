/*
 * tds.h
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#ifndef DRIVERS_TDS_TDS_H_
#define DRIVERS_TDS_TDS_H_

#include "main.h"
#include <stdint.h>

typedef struct
{
    float voltage;   // 电压
    float ec;        // 电导率 (uS/cm)
    float tds;       // TDS (ppm)
} TDS_Data_t;

void TDS_Init(void);

void TDS_Calc(uint16_t adc, TDS_Data_t *out);

#endif /* DRIVERS_TDS_TDS_H_ */
