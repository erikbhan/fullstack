package edu.ntnu.erikbhan.backend.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    public double calculate(double num1, double num2, String operation) {
        if (operation.equals("/") && num2 == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }

        switch (operation) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "×":
                return num1 * num2;
            case "÷":
                return num1 / num2;
            default:
                throw new IllegalArgumentException("Invalid operation: " + operation);
        }
    }

}
