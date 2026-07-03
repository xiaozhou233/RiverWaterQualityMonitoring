/*
 * adc_utils.c
 *
 *  Created on: 2026年7月1日
 *      Author: xiaozhou233
 */

#include "adc_utils.h"

uint16_t ADC_Read(ADC_HandleTypeDef *hadc)
{
    HAL_ADC_Start(hadc);

    HAL_ADC_PollForConversion(hadc, HAL_MAX_DELAY);

    uint16_t value = HAL_ADC_GetValue(hadc);

    HAL_ADC_Stop(hadc);

    return value;
}

uint32_t ADC_ToMilliVolt(uint16_t adc)
{
    return ((uint32_t)adc * 3300 + 2047) / 4095;
}
