
# 0. triết lí
- structure tốt là, nhìn vào thấy được file chính file phụ
- show chính giấu phụ
- xác định được các [DANH TỪ RIÊNG] và đặt tên mọi thứ xoay quanh nó, (vd về danh từ riêng: Ev, TLBaseBg, TLBaseFg, Redline,....)
- có hình vẽ visualize các [DANH TỪ RIÊNG] đó
- [DANH TỪ RIÊNG] là linh hồn của source code, nó là nhân vật chính
- tên của component phải === '_' + id + [DANH TỪ RIÊNG]
- những component nhỏ lẻ, có thể đặt trong componentFolder liên quan, nhưng hạn chế điều này

# 1.structure
- mỗi đơn vị UI là 1 component và tương ứng với 1 folder, 
- tất cả mọi thứ phải gói trong folder đó

# 2.name
- tên file, folder phải viết hoa, và có s/es
- tên phải ưu tiên dễ đọc, vd: Level thì "Le" thay vì "lv"
<!-- - khi có nhiều tên liên quan, thì đưa [DANH TỪ RIÊNG] ra trước, vd: bgRed, bgYellow,... (để ) -->
- nếu chắc chắn source sẽ mở rộng, thì đặt tên theo version.mở rộng
- nếu không, đổi tên là đơn giản, nên khi mở rộng rồi hẵng đổi
- khi tên dài, phần đặc trưng lớn nhất phải đưa ra trước, vd: TI, Redline....

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

# 9. vị trí lưu hàm/component...
- xcss.ts/xhelper.tsx/xuis.tsx chứa các hàm ít quan trọng, ít sử dụng,
- hầu hết, chúng chỉ phục vụ local, k được dùng ở "component bên ngoài"