/*
 * ph.h
 *
 * Created on: 2026年7月3日
 * Author: xiaozhou233
 */

#ifndef PH_H
#define PH_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct
{
    float voltage;
    float mv;
    float ph;
} PH_Data_t;

void PH_Init(void);
void PH_Calc(uint16_t adc, PH_Data_t *out);

#ifdef __cplusplus
}
#endif

#endif
