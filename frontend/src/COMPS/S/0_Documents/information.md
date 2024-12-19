
# 1.Các từ viết tắt
- Re: Repository
- Se: Service
- Mo: Model

- Ev: Event
- Cur: Current
- TI: Timeline Item

- TILeft:    là TI ở bên trái màn hình mà mình thấy được
- TIRight:             phải_
- TIFirst: là TI đầu tiên trong TIList
- TILast:  _     cuối

- wi: width
- he: height

- Gh: God hour, tức thời gian tính theo mốc God, năm 0 Sau Công Nguyên
- Rh: Root hour, tức thời gian tính từ mốc của TLBaseBgContent

# 2.convention
- mỗi đơn vị UI là 1 component và tương ứng với 1 folder, 
- tất cả mọi thứ phải gói trong folder đó
- tên file, folder phải viết hoa, và có s/es
- id phải luôn là string nếu có thể, khi bắt buộc number thì mới dùng number,
- giờ ở DB là UTC, ở backend thì convert thành localTime rồi gửi lên FE

- id luôn bắt đầu từ 0, tức id luôn bằng index trong array
- mặc định thì dùng loại giờ: Gh, và time: cDate

- khi đánh số, luôn luôn dùng số 0, cho đồng bộ với index, (các field phổ biến: Order, stt....)
- luôn set value mặc định cho customField (vd: StatusC, Active,....), chứ k dùng null

# 3.logic
- khi di chuột, update spotlightmoment
- khi wheeling, ta update TIList, và spotlightTI trở thành newTIMid
- khi scroll to leftEdge,  TILeft của curTIList sẽ trở thành newTIMid
- _             right,      right_

# 4. chuyện về type của date
- dùng cDate trong db, vì nó sẽ trực quan, ta sẽ đọc và hiểu được data
- cái chính là chuyển từ cDate <-> width
- 
- k dùng newDate, vì cái này bổ sung sau cũng dc,
- về tính chính xác của cDate, nó có nghiêm trọng không? --> không, vì chỉ cần thêm 1 thuộc tính exactDate để lưu newDateString là xong

# 4.note
- URL gồm: https + domain + API endpoint + params

## 4.1.câu hỏi
- dùng https thay vì http (tại sao portal lại dùng http thay vì https) ?
