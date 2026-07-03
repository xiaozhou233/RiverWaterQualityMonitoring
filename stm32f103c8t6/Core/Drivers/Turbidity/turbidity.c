/*
 * turbidity.c
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

/*
 * turbidity.c
 */

#include "turbidity.h"
#include <stdint.h>
#include <stddef.h>

static const float K_VALUE = 3347.19f;

static const float TURBIDITY_OFFSET = 1140.0f;

void TURBIDITY_Init(void)
{

}

void TURBIDITY_Calc(uint16_t adc, TURBIDITY_Data_t *out)
{
    if(out == NULL) return;

    float voltage = adc * (3.3f / 4096.0f);
    out->voltage = voltage;

    float raw = -865.68f * voltage + K_VALUE;

    if(raw < 0) raw = 0;
    if(raw > 3000) raw = 3000;

    float ntu = raw - TURBIDITY_OFFSET;

    if(ntu < 0) ntu = 0;
    if(ntu > 3000) ntu = 3000;

    out->ntu = ntu;
}
