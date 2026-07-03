/*
 * tds.c
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#include "tds.h"

void TDS_Init(void)
{

}

/**
 * @brief TDS + EC 计算核心
 */
void TDS_Calc(uint16_t adc, TDS_Data_t *out)
{
    if (out == NULL) return;

    // ADC -> V
    float voltage = adc * (3.3f / 4096.0f);
    out->voltage = voltage;

    // V -> ec
    float ec =
        24.9f * voltage * voltage * voltage
      -132.3f * voltage * voltage
      +268.5f * voltage
      +15.0f;

    if (ec < 0) ec = 0;
    out->ec = ec;

    const float k = 0.5f;


    // ec -> TDS
    float tds = ec * k;

    if (tds < 0) tds = 0;
    out->tds = tds;
}
