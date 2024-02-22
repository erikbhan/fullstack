package edu.ntnu.erikbhan.backend.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.ntnu.erikbhan.backend.model.CalculationRequest;
import edu.ntnu.erikbhan.backend.service.CalculatorService;

@RestController
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    Logger logger = LoggerFactory.getLogger(CalculatorController.class);

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/calculate")
    public ResponseEntity<Double> calculate(@RequestBody CalculationRequest request) {
        logger.info("Received request: " + request);
        
        double result = 0.0;
        try {
            result = calculatorService.calculate(request.getNum1(), request.getNum2(), request.getOperation());
        } catch (Exception e) {
            logger.error("Error occurred: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }

        logger.info("Returning result: " + result);
        return ResponseEntity.ok(result);
    }
}
