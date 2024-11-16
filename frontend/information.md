
# 1.Các từ viết tắt
- Re: Repository
- Se: Service
- Mo: Model

- Ev: Event
- El: element
- IS: InfinityScroll
- Cur: Current
- TI: TI

- TILeft:    là TI ở bên trái màn hình mà mình thấy được
- TIRight:             phải_
- TIFirst: là TI đầu tiên trong TIList
- TILast:  _     cuối

- wi: width
- he: height

# 2.convention
- mỗi đơn vị UI là 1 component và tương ứng với 1 folder, 
- tất cả mọi thứ phải gói trong folder đó
- tên file, folder phải viết hoa, và có s/es
- id phải luôn là string nếu có thể, khi bắt buộc number thì mới dùng number,
- giờ ở DB là UTC, ở backend thì convert thành localTime rồi gửi lên FE

# 3.logic
- khi di chuột, update spotlightmoment
- khi wheeling, ta update TIList, và spotlightTI trở thành newTIMid
- khi scroll to leftEdge,  TILeft của curTIList sẽ trở thành newTIMid
- _             right,      right_

# 4.note
- max trên screen: 50TI (tuỳ vào screen lớn/nhỏ)
- URL gồm: https + domain + API endpoint + params

## 4.1.câu hỏi
- dùng https thay vì http (tại sao portal lại dùng http thay vì https) ?
