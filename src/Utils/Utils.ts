import { v4 as uuidv4 } from 'uuid';

export function GenerateGuidId() {
    return uuidv4().toString();
}
