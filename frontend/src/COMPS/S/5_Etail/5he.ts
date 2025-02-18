

export function FinkToProtocol(link: string): string | null {
    try {
        if(!link || link.length <10) 
            throw new Error("Empty link");
        const url = new URL(link);

        // Kiểm tra xem link có phải là từ Figma không
        if (url.hostname !== "www.figma.com" || !url.pathname.startsWith("/board/")) {
            throw new Error("Invalid Figma board link");
        }
        // Lấy ID của bảng (boardId) và các tham số (query params)
        const boardId: string = url.pathname.split("/board/")[1].split("/")[0];
        const nodeId: string | null = url.searchParams.get("node-id");

        // Tạo link dạng figma://
        const figmaLink: string = `figma://board/${boardId}${nodeId ? `?node-id=${nodeId}` : ""}`;
        console.log("Figma link:", figmaLink);
        return figmaLink;
    } 
    catch (error) {
        console.error("Error converting Figma link:", (error as Error).message);
        return null;
    }
}