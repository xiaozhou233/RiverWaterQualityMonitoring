/*
 * tds.c
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#include "tds.h"
#include "adc_utils.h"

// mV -> TDS
static float TDS_From_mV(uint32_t mv)
{
    float v = mv / 1000.0f;

    float tds;

    tds = 24.9f * v * v * v
        - 132.3f * v * v
        + 268.5f * v
        + 15.0f;

    if (tds < 0) tds = 0;
    if (tds > 9999) tds = 9999;

    return tds;
}

float TDS_Read(ADC_HandleTypeDef *hadc)
{
    uint16_t adc = ADC_Read(hadc);
    uint32_t mv = ADC_ToMilliVolt(adc);

    return TDS_From_mV(mv);
}
