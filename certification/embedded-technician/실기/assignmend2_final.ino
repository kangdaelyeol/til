#include "tmp.h"
// typedef
typedef enum : uint8_t {
	RED,
	GREEN,
	BLUE
} LedColor;

#define IS_LED_OFF (ledOn == 0)
#define FND_ZERO (fndNumber == 0)
#define FND_MAX (fndNumber == 99)
#define sw1 2
#define sw2 3
#define sw3 4
#define ledR 5
#define ledG 6
#define ledB 7
#define fnd1 12
#define fnd2 13

const uint8_t fndPins[4] = {8, 9, 10, 11};

uint8_t action = 0;
uint8_t fndNumber = 50;
uint8_t ledOn = 0;

unsigned long swPushed = 0;
unsigned long maxPushed = 0;

// utils

void resetFlag() {
	action = 0;
	swPushed = 0;
	maxPushed = 0;
}

// led actions

void offLed() {
	digitalWrite(ledR, LOW);
	digitalWrite(ledG, LOW);
	digitalWrite(ledB, LOW);
	ledOn = 0;
}

void onLed(LedColor color) {
	offLed();
	ledOn = 1;
	switch (color) {
	case RED:
		digitalWrite(ledR, HIGH);
		break;
	case GREEN:
		digitalWrite(ledG, HIGH);
		break;
	case BLUE:
		digitalWrite(ledB, HIGH);
		break;
	}
}

// fnd actions

void setFndOn(uint8_t fnd1On, uint8_t fnd2On) {
	digitalWrite(fnd1, fnd1On);
	digitalWrite(fnd2, fnd2On);
}

void showFnd(uint8_t num, uint8_t time) {
	uint8_t tensDigit = num / 10;
	uint8_t onesDigit = num % 10;

	for (uint8_t t = 0; t < time; t++) {
		setFndOn(HIGH, LOW);
		for (uint8_t i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (tensDigit >> i) & 1);
		}
		delay(5);
		setFndOn(LOW, HIGH);
		for (uint8_t i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (onesDigit >> i) & 1);
		}
		delay(5);
	}
}

void clearFnd() {
	for (uint8_t i = 0; i < 4; i++) {
		digitalWrite(fnd1, LOW);
		digitalWrite(fnd2, LOW);
	}
}

// actions

void resetAction() {
	offLed();
	action = 0;
	for (uint8_t i = 0; i < 2; i++) {
		setFndOn(HIGH, HIGH);
		showFnd(88, 200);
		setFndOn(LOW, LOW);
		clearFnd();
		delay(1000);
	}

	onLed(RED);
	delay(1000);
	onLed(GREEN);
	delay(1000);
	onLed(BLUE);
	delay(1000);
	delay(1000);
	offLed();
	setFndOn(HIGH, HIGH);
	onLed(RED);
}

void action1() {
	showFnd(fndNumber, 5);
	if (FND_ZERO) {
		if (maxPushed == 0)
			maxPushed = millis();
		else if (millis() - maxPushed >= 1000) {
			return action3();
		}
	} else {
		fndNumber--;
	}
	if (IS_LED_OFF) {
		onLed(BLUE);
	} else {
		offLed();
	};
	if (digitalRead(sw1) == HIGH) {
		resetFlag();
		onLed(RED);
	}
}

void action2() {
	showFnd(fndNumber, 5);
	if (FND_MAX) {
		if (maxPushed == 0) {
			maxPushed = millis();
		} else if (millis() - maxPushed >= 1000) {
			return action3();
		}
	} else {
		fndNumber++;
	}
	if (IS_LED_OFF) {
		onLed(GREEN);
	} else {
		offLed();
	};
	if (digitalRead(sw2) == HIGH) {
		offLed();
		onLed(RED);
		resetFlag();
	}
}

void action3() {
	onLed(RED);
	showFnd(0, 50);
	onLed(BLUE);
	showFnd(99, 50);
	onLed(GREEN);
	showFnd(0, 50);
	offLed();
	showFnd(99, 50);
	onLed(RED);
	fndNumber = 50;
	resetFlag();
}

// default method

void setup() {
	pinMode(sw1, INPUT_PULLUP);
	pinMode(sw2, INPUT_PULLUP);
	pinMode(sw3, INPUT_PULLUP);
	pinMode(ledR, OUTPUT);
	pinMode(ledG, OUTPUT);
	pinMode(ledB, OUTPUT);
	pinMode(fnd1, OUTPUT);
	pinMode(fnd2, OUTPUT);

	for (uint8_t i = 0; i < 4; i++)
		pinMode(fndPins[i], OUTPUT);

	resetAction();
}

void loop() {
	if (action == 0) showFnd(fndNumber, 1);
	if (action == 1) {
		return action1();
	}
	if (action == 2) {
		return action2();
	}

	if (digitalRead(sw1) == LOW) {
		if (action != 0) return;

		if (swPushed == 0) {
			swPushed = millis();
			return;
		}

		if (millis() - swPushed >= 1000) {
			offLed();
			action = 1;
			return;
		}
	}

	else if (digitalRead(sw2) == LOW) {
		if (swPushed == 0) {
			swPushed = millis();
			return;
		}
		if (millis() - swPushed >= 1000) {
			offLed();
			action = 2;
			return;
		}
	} else {
		swPushed = 0;
	}
}