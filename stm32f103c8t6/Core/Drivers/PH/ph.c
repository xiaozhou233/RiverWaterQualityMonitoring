/*
 * ph.c
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */
#include "ph.h"
#include <stddef.h>

static const float PH7_MV = 1810.0f;

static const float PH_SLOPE = 177.43f;

static const float ADC_VREF = 3.3f;
static const float ADC_MAX  = 4096.0f;

void PH_Init(void)
{
}

static float ph_offset = -1.2f;

void PH_Calc(uint16_t adc, PH_Data_t *out)
{
    if(out == NULL) return;

    float voltage = adc * (ADC_VREF / ADC_MAX);
    out->voltage = voltage;

    float mv = voltage * 1000.0f;
    out->mv = mv;

    float ph = 7.0f + (PH7_MV - mv) / PH_SLOPE;

    ph += ph_offset;

    if(ph < 0.0f) ph = 0.0f;
    if(ph > 14.0f) ph = 14.0f;

    out->ph = ph;
}
