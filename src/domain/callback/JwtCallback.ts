import {JwtPayload} from "jsonwebtoken";

export interface JwtCallback {
    (success: boolean, result?: JwtPayload | string): void;
}