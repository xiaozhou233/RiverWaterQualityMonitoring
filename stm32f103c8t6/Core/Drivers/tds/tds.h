/*
 * tds.h
 *
 *  Created on: 2026年7月3日
 *      Author: xiaozhou233
 */

#ifndef DRIVERS_TDS_TDS_H_
#define DRIVERS_TDS_TDS_H_

#include "stm32f1xx_hal.h"
#include <stdint.h>

float TDS_Read(ADC_HandleTypeDef *hadc);

#endif /* DRIVERS_TDS_TDS_H_ */
