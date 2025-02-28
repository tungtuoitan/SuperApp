export function toggleX(inputString: string, x: string): string {
    // Tách chuỗi thành mảng các phần tử
    const elements: string[] = inputString.split(";").filter((el) => el !== "");
    // Kiểm tra xem x có trong mảng không
    if (elements.includes(x)) {
        // Nếu có, xóa x
        return elements.filter((element) => element !== x).join(";");
    } else {
        // Nếu không, thêm x
        elements.push(x);
        return elements.join(";");
    }
}

export function countWords(text: string): number {
    return text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // Tạo bản sao để tránh thay đổi mảng gốc
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

