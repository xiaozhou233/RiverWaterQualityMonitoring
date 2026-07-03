/*
 * adc_driver.c
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#include "adc_driver.h"
#include "stm32f1xx_hal.h"
#include <stddef.h>
#include <stdint.h>

extern ADC_HandleTypeDef hadc1;

// DMA缓存
static uint16_t adc_buf[ADC_CHANNEL_NUM];

/**
 * @brief  启动ADC + DMA
 */
void ADC_Driver_Init(void)
{
    HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_buf, ADC_CHANNEL_NUM);
}

/**
 * @brief  获取最新ADC原始数据
 */
void ADC_GetRaw(ADC_RawData_t *data)
{
    if (data == NULL) return;

    // PA0 -> PH
    // PA1 -> TDS
    // PA2 -> TURBIDITY

    data->ph        = adc_buf[0];
    data->tds       = adc_buf[1];
    data->turbidity = adc_buf[2];
}
