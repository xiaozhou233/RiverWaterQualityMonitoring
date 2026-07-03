/*
 * adc_utils.h
 *
 *  Created on: 2026年7月1日
 *      Author: xiaozhou233
 */

#ifndef ADC_UTILS_H
#define ADC_UTILS_H

#include "main.h"

// Read ADC value
uint16_t ADC_Read(ADC_HandleTypeDef *hadc);

// Convert ADC value to millivolts
uint32_t ADC_ToMilliVolt(uint16_t adc);

#endif
