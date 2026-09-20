#include "tmp.h"
// 1초는 편의상 0.2초로 변경

#define sw1 2
#define sw2 3
#define sw3 4
#define ledR 5
#define ledG 6
#define ledB 7
uint8_t fndPins[] = {8, 9, 10, 11};
#define seg1 12
#define seg2 13
#define IS_LED_ON (isLedOn == 1)

uint8_t fndNumber = 0;
uint8_t isLedOn = 0;
uint8_t pushedSw = 0;
uint8_t action = 0;

// utils

int swPushed(uint8_t sw) {
	return digitalRead(sw) == LOW;
}

void activeFnd(uint8_t state) {
	digitalWrite(seg1, state == 0 ? LOW : HIGH);
	digitalWrite(seg2, state == 0 ? LOW : HIGH);
}

void showFnd(uint8_t num) {
	activeFnd(1);
	for (uint8_t i = 0; i < 4; i++) {
		digitalWrite(fndPins[i], num >> i & 1);
	}
}

void offLed() {
	digitalWrite(ledR, LOW);
	digitalWrite(ledG, LOW);
	digitalWrite(ledB, LOW);
	isLedOn = 0;
}

void onLed(int c) {
	offLed();
	digitalWrite(c, HIGH);
	isLedOn = 1;
}

// actions

void initAction() {
	for (uint8_t i = 0; i < 2; i++) {
		showFnd(8);
		delay(200);
		activeFnd(0);
		delay(200);
	}
	showFnd(fndNumber);
	onLed(ledR);
	delay(200);
	onLed(ledG);
	delay(200);
	onLed(ledB);
	delay(200);
	offLed();
	delay(200);
	onLed(ledR);
}

// actions - action1

void action1Active() {
	offLed();
	showFnd(8);
	delay(500);
	onLed(ledG);
	delay(200);
	onLed(ledR);
	delay(200);
	fndNumber = 0;
	action = 1;
}

void action1() {
	IS_LED_ON ? offLed() : onLed(ledG);
	showFnd(fndNumber++);
	fndNumber %= 10;
	delay(300);
}

// actions - action2

void action2Active() {
	showFnd(8);
	delay(500);
	onLed(ledB);
	delay(200);
	onLed(ledR);
	delay(200);
	fndNumber = 9;
	action = 2;
}

void action2() {
	IS_LED_ON ? offLed() : onLed(ledG);
	showFnd(fndNumber);
	fndNumber = fndNumber == 0 ? 9 : fndNumber - 1;
	delay(300);
}

// actions - action3

void action3() {
	for (uint8_t i = 0; i < 2; i++) {
		activeFnd(0);
		delay(300);
		showFnd(fndNumber);
		delay(300);
	}
	for (uint8_t i = 0; i < 2; i++) {
		onLed(ledR);
		delay(300);
		offLed();
		delay(300);
	}
}

void setup() {
	// pin setup
	pinMode(sw1, INPUT_PULLUP);
	pinMode(sw2, INPUT_PULLUP);
	pinMode(sw3, INPUT_PULLUP);
	pinMode(ledR, OUTPUT);
	pinMode(ledG, OUTPUT);
	pinMode(ledB, OUTPUT);
	pinMode(seg1, OUTPUT);
	pinMode(seg2, OUTPUT);
	for (uint8_t i = 0; i < 4; i++) {
		pinMode(fndPins[i], OUTPUT);
	}

	initAction();
}

void loop() {
	if (pushedSw) {
		switch (pushedSw) {
		case 1:
			if (!swPushed(sw1)) {
				if (action != 1)
					action1Active();
				else
					action3();
			}
			break;
		case 2:
			if (!swPushed(sw2)) {
				if (action != 2)
					action2Active();
				else
					action3();
			}
			break;
		}
	}
	if (swPushed(sw1)) {
		pushedSw = 1;
	} else if (swPushed(sw2)) {
		pushedSw = 2;
	} else {
		pushedSw = 0;
	}

	if (action == 1) action1();
	if (action == 2) action2();
}
