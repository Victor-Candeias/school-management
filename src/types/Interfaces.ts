export interface SchoolInterface {
    id?: string;
    userId: string,
    code: string;
    name: string;
    address: string;
    email: string;
    contact: string
    status?: number;
    message?: string;
}

export interface YearsInterface {
    _id?: string;    // Optional ID for the year
    userId: string,
    schoolId: string; // ID of the school associated with the year
    name: string;   // Year name (e.g., "2023-2024 Academic Year")
    status?: number;
    message?: string;
}

export interface ClassInterface {
    id?: string;
    userId: string,
    schoolId: string,
    yearId: string,
    name: string;
    schoolYear: string;
    status?: number;
    message?: string;
}