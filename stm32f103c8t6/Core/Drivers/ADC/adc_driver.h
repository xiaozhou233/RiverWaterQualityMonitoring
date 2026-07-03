/*
 * adc_driver.h
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#ifndef DRIVERS_ADC_DRIVER_H_
#define DRIVERS_ADC_DRIVER_H_

#define ADC_CHANNEL_NUM 3

#include <stdint.h>

typedef struct
{
    uint16_t ph;
    uint16_t tds;
    uint16_t turbidity;
} ADC_RawData_t;

void ADC_Driver_Init(void);

void ADC_GetRaw(ADC_RawData_t *data);


#endif /* DRIVERS_ADC_DRIVER_H_ */
