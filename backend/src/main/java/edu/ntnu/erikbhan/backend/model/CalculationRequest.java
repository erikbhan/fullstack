package edu.ntnu.erikbhan.backend.model;

public class CalculationRequest {
    
        private double num1;
        private double num2;
        private String operation;

        public CalculationRequest(double num1, double num2, String operation) {
            this.num1 = num1;
            this.num2 = num2;
            this.operation = operation;
        }
    
        public double getNum1() {
            return num1;
        }
    
        public double getNum2() {
            return num2;
        }
    
        public String getOperation() {
            return operation;
        }

        public String toString() {
            return "CalculationRequest(num1=" + this.getNum1() + ", num2=" + this.getNum2() + ", operation=" + this.getOperation() + ")";
        }
}
