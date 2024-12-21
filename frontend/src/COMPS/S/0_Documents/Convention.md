
# 1.structure
- mỗi đơn vị UI là 1 component và tương ứng với 1 folder, 
- tất cả mọi thứ phải gói trong folder đó
- structure tốt là, nhìn vào thấy được file chính file phụ

# 2.name
- tên file, folder phải viết hoa, và có s/es
- tên phải ưu tiên dễ đọc, vd: Level thì "Le" thay vì "lv"
<!-- - khi có nhiều tên liên quan, thì đưa từ chung ra trước, vd: bgRed, bgYellow,... (để ) -->

# 3.type
- id phải luôn là number nếu có thể
- code: string 
- desc: string

# 4.thời gian
- giờ ở DB là UTC, ở backend thì convert thành localTime rồi gửi lên FE
- mặc định thì dùng loại giờ: Gh, và time: cDate

# 5. đánh số ID
- id luôn bắt đầu từ 0, tức id luôn bằng index trong array
- khi đánh số, luôn luôn dùng số 0, cho đồng bộ với index, (các field phổ biến: Order, stt....)

# 6. default value
- luôn set value mặc định cho customField (vd: StatusC, Active,....), chứ k dùng null

# 7. bố cục file
- trong file chứa hàm, phân thành 2 cục, cục phổ biến và cục ít phổ biến
- file không quá 400 line, cần thì chia nhỏ file

# 8. viết hàm
- gắn chặt tên hàm và flow data, 
- hàm ít dùng, ít phổ biến,

