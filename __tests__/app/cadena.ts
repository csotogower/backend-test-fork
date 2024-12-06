import { describe, test, expect } from "@jest/globals";
import { contarCoincidenciasEnCadena } from "../../src/app/cadenas";

describe("Bateria de test de cadenas", () => {

    test("Prueba basica", () => {
        expect(1).toBe(1);
    });

    test("Encuentra la cantidad de veces que una subcadena se encuentra en una cadena", () => {

        expect(contarCoincidenciasEnCadena('123dgdgdgdg','dg')).toBe(true);

        //expect(esPrimo(4)).toBe(false);

        //expect(esPrimo(1)).toBe(false);

    });
    

});