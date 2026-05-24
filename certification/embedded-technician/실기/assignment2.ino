#include "tmp.h"

const int sw1 = 2, sw2 = 3, sw3 = 4;
const int ledR = 5, ledG = 6, ledB = 7;
const int fnd1 = 12;
const int fnd2 = 13;
const int fndPins[4] = {8, 9, 10, 11};

int action = 0;
int fndNumber = 50;
int r = 0;
int g = 0;
int b = 0;

unsigned long sw1Pushed = 0;
unsigned long sw2Pushed = 0;
unsigned long maxPushed = 0;

void offLed() {
	digitalWrite(ledR, LOW);
	digitalWrite(ledG, LOW);
	digitalWrite(ledB, LOW);
	r = g = b = 0;
}

void onLed(char* type) {
	offLed();
	if (strcmp(type, "red") == 0) {
		digitalWrite(ledR, HIGH);
		r = 1;
	} else if (strcmp(type, "green") == 0) {
		digitalWrite(ledG, HIGH);
		g = 1;
	} else if (strcmp(type, "blue") == 0) {
		digitalWrite(ledB, HIGH);
		b = 1;
	}
}

void showFnd(int num, int time) {
	int tensDigit = num / 10;
	int onesDigit = num % 10;

	for (int t = 0; t < time; t++) {
		digitalWrite(fnd1, HIGH);
		digitalWrite(fnd2, LOW);
		for (int i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (tensDigit >> i) & 1);
		}
		delay(5);
		digitalWrite(fnd1, LOW);
		digitalWrite(fnd2, HIGH);
		for (int i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (onesDigit >> i) & 1);
		}
		delay(5);
	}
}

void clearFnd() {
	for (int i = 0; i < 4; i++) {
		digitalWrite(fnd1, LOW);
		digitalWrite(fnd2, LOW);
	}
}

void resetAction() {
	offLed();
	action = 0;
	for (int i = 0; i < 2; i++) {
		digitalWrite(fnd1, HIGH);
		digitalWrite(fnd2, HIGH);
		showFnd(88, 200);
		digitalWrite(fnd1, LOW);
		digitalWrite(fnd2, LOW);
		clearFnd();
		delay(1000);
	}

	digitalWrite(ledR, HIGH);
	delay(1000);
	digitalWrite(ledR, LOW);
	digitalWrite(ledG, HIGH);
	delay(1000);
	digitalWrite(ledG, LOW);
	digitalWrite(ledB, HIGH);
	delay(1000);
	digitalWrite(ledB, LOW);
	delay(1000);
	digitalWrite(ledR, HIGH);
	digitalWrite(fnd1, HIGH);
	digitalWrite(fnd2, HIGH);
}

void setup() {
	pinMode(sw1, INPUT_PULLUP);
	pinMode(sw2, INPUT_PULLUP);
	pinMode(sw3, INPUT_PULLUP);
	pinMode(ledR, OUTPUT);
	pinMode(ledG, OUTPUT);
	pinMode(ledB, OUTPUT);
	pinMode(fnd1, OUTPUT);
	pinMode(fnd2, OUTPUT);

	for (int i = 0; i < 4; i++)
		pinMode(fndPins[i], OUTPUT);

	resetAction();
}

void action1() {
	showFnd(fndNumber, 5);
	if (fndNumber == 0) {
		if (maxPushed == 0)
			maxPushed = millis();
		else if (millis() - maxPushed >= 1000) {
			return action3();
		}
	} else {
		fndNumber--;
	}
	if (b == 0) {
		onLed("blue");
	} else {
		offLed();
	};
	if (digitalRead(sw1) == HIGH) {
		action = 0;
		sw1Pushed = 0;
		maxPushed = 0;
		offLed();
		onLed("red");
	}
}

void action2() {
	showFnd(fndNumber, 5);
	if (fndNumber == 99) {
		if (maxPushed == 0) {
			maxPushed = millis();
		} else if (millis() - maxPushed >= 1000) {
			return action3();
		}
	} else {
		fndNumber++;
	}
	if (g == 0) {
		onLed("green");
	} else {
		offLed();
	};
	if (digitalRead(sw2) == HIGH) {
		offLed();
		onLed("red");
		maxPushed = 0;
		sw2Pushed = 0;
		action = 0;
	}
}

void action3() {
	onLed("red");
	showFnd(0, 50);
	onLed("blue");
	showFnd(99, 50);
	onLed("green");
	showFnd(0, 50);
	offLed();
	showFnd(99, 50);
	onLed("red");
	fndNumber = 50;
	maxPushed = 0;
	sw2Pushed = 0;
	sw1Pushed = 0;
	action = 0;
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

		if (sw1Pushed == 0) {
			sw1Pushed = millis();
			return;
		}

		if (millis() - sw1Pushed >= 1000) {
			offLed();
			action = 1;
			return;
		}
	} else {
		sw1Pushed = 0;
	}

	if (digitalRead(sw2) == LOW) {
		if (sw2Pushed == 0) {
			sw2Pushed = millis();
			return;
		}
		if (millis() - sw2Pushed >= 1000) {
			offLed();
			action = 2;
			return;
		}
	} else {
		sw2Pushed = 0;
	}
}