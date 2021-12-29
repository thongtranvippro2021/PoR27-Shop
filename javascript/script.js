var formDangNhapDangKy = document.getElementsByClassName("form-total")[0];
var gioHang = document.getElementsByClassName("modal-cart")[0];
var formDangKy = document.getElementsByClassName("form-register")[0];
var formDangNhap = document.getElementsByClassName("form-login")[0];
var overLay = document.getElementsByClassName("overlay")[0];


var log_Out = document.getElementById("logOut");

var daDangNhap = false;

class TaiKhoan
{
  email = "";
  matkhau = "";
  constructor(email, matkhau)
  {
    this.email = email;
    this.matkhau = matkhau;
  }
}

var taikhoan1 = new TaiKhoan("thongtranpc2@gmail.com","19092002");
var taikhoan2 = new TaiKhoan("kiettranpc@gmail.com","05021995");

var dsTaiKhoan = new Array();

dsTaiKhoan.push(taikhoan1);
dsTaiKhoan.push(taikhoan2);


function hienThiGioHang()
{
  if(gioHang.style.display == 'none')
  {
    if(formDangNhapDangKy.style.display = 'block')
      formDangNhapDangKy.style.display = 'none';
    overLay.style.display = 'block';
    gioHang.style.display = 'block';
  }
  else
  {
    overLay.style.display = 'none';
    gioHang.style.display = 'none';
  }
}
function hienThiFormDangNhapDangKy()
{
  if(formDangNhapDangKy.style.display == 'none')
  {
    if(gioHang.style.display = 'block')
      gioHang.style.display = 'none';
    overLay.style.display = 'block';
    formDangNhapDangKy.style.display = 'block';
    formDangNhap.style.display = 'block';
    formDangKy.style.display = 'none';
  }
  else
  {
    overLay.style.display = 'none';
    formDangNhapDangKy.style.display = 'none';
  }
}
function tatOverlay()
{
  gioHang.style.display = 'none';
  formDangNhapDangKy.style.display ='none';
  overLay.style.display ='none';
}

function FormDangNhapToDangKy()
{
    formDangNhap.style.display = 'none';
    formDangKy.style.display = 'block';
}
function FormDangKyToDangNhap()
{
    formDangNhap.style.display = 'block';
    formDangKy.style.display = 'none';
}

function giaoDienTaiKhoan()
{
  tatOverlay();
  document.getElementById("btn-user").style.display = 'none';
  log_Out.style.display = 'block';
}
function giaoDienKhach()
{
  tatOverlay();
  document.getElementById("btn-user").style.display = 'block';
  log_Out.style.display = 'none';
}

function DangXuat()
{
  daDangNhap = false;
  var doiTuongCha = document.getElementsByClassName("cart-items")[0];
  doiTuongCha.innerHTML = "";
  capNhatTongTien();
  giaoDienKhach();
}

function validateDangKy()
{
  var rgtEmail = document.getElementById("rgt-email");
  var rgtPassword = document.getElementById("rgt-password");
  var rgtRePassword = document.getElementById("rgt-re-password");
  if (rgtPassword.value == "" || rgtRePassword.value == "" || rgtEmail.value == "")
  {
    alert("Không được để trống");
    return;
  }

  if (rgtPassword.value.length < 6)
  {
    alert("Mật khẩu từ 6 kí tự");
    return;
  }
  if (rgtPassword.value != rgtRePassword.value)
  {
    alert("Mật khẩu xác nhận không chính xác");
    return;
  }
  for(var i = 0 ; i < dsTaiKhoan.length ; i++)
  {
    if(rgtEmail.value == dsTaiKhoan[i].email)
    {
      alert("Email đã tồn tại!");
      return;
    }
  }
  var taiKhoanMoi = new TaiKhoan(rgtEmail.value,rgtPassword.value);
  dsTaiKhoan.push(taiKhoanMoi);

  alert("Đăng ký thành công !");
  FormDangKyToDangNhap();

}
function validateDangNhap()
{
  var email_login = document.getElementById("login-email");
  var password_login = document.getElementById("login-password");
  if (password_login.value == "" || email_login.value == "")
  {
    alert("Không được để trống");
    return;
  }
  for(var i = 0 ; i < dsTaiKhoan.length ; i++)
  {
    if(dsTaiKhoan[i].email == email_login.value)
      if(dsTaiKhoan[i].matkhau == password_login.value)
      {
        daDangNhap = true;
        giaoDienTaiKhoan();
        return;
      }
  }
  alert("Sai tên đăng nhập hoặc mật khẩu");

}

function capNhatTongTien()
{
  var tongTien = 0;
  var doiTuongCha = document.getElementsByClassName("cart-items")[0];
  var dsSanPham = doiTuongCha.getElementsByClassName("cart-row");

  for ( let i = 0; i < dsSanPham.length ; i++)
  {
    var sanPhamHienTai = dsSanPham[i];
    var donGia = parseFloat(sanPhamHienTai.getElementsByClassName("cart-price")[0].innerText);
    var soLuong = sanPhamHienTai.getElementsByClassName("cart-quantity-input")[0].value; 
    tongTien = tongTien + (soLuong * donGia);
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = tongTien + "VNĐ";
}

// Them San Pham
var mangNutThem = document.getElementsByClassName("btn-cart");
for (var i = 0; i < mangNutThem.length; i++) {
    var nutThem = mangNutThem[i];
    nutThem.addEventListener("click", function (event) {
    if ( daDangNhap == false)
    {
      if(confirm("Vui lòng đăng nhập để thêm sản phẩm"))
        {
          overLay.style.display ='block';
          formDangNhapDangKy.style.display ='block';
        }
      return;
    }
    var button = event.target;
    var sanPhamHienTai = button.parentElement.parentElement.parentElement;
    var img = sanPhamHienTai.getElementsByClassName("img-prd")[0].src;
    var tenSanPham = sanPhamHienTai.getElementsByClassName("content-product-h3")[0].innerText;
    var donGia = sanPhamHienTai.getElementsByClassName("price")[0].innerText;
    addItemToCart(tenSanPham, donGia, img);
    capNhatTongTien();
  })
}

function addItemToCart(tenSanPham, donGia, img) {
  var sanPhamMoi = document.createElement('div');
  sanPhamMoi.classList.add('cart-row');
  
  var doiTuongCha = document.getElementsByClassName('cart-items')[0];
  var dsTenHangDaThem = doiTuongCha.getElementsByClassName('cart-item-title');

  for (var i = 0; i < dsTenHangDaThem.length; i++) {
    if (dsTenHangDaThem[i].innerText == tenSanPham) {
      alert('Sản Phẩm Đã Được Thêm Trong Giỏ Hàng');
      return;
    }
  }

  var noiDungHTMLSanPhamThem = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width="100" height="100">
        <span class="cart-item-title">${tenSanPham}</span>
    </div>
    <span class="cart-price cart-column">${donGia}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Xóa</button>
    </div>`

  sanPhamMoi.innerHTML = noiDungHTMLSanPhamThem;
  doiTuongCha.append(sanPhamMoi);

  sanPhamMoi.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    doiTuongCha.removeChild(this.parentElement.parentElement);
    capNhatTongTien();
  })
  sanPhamMoi.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function () {
    if (isNaN(this.value) || this.value <= 0)
      this.value = 1;
    capNhatTongTien();
  })
}

var InputTimSanPham = document.getElementById("inp-timKiemLoai"); 
var InputTimSanPhamNangCao = document.getElementById("inp-timKiemNangCao");

var InputGiaBatDau = document.getElementById("giaBegin");
var InputGiaKetThuc = document.getElementById("giaEnd");

var mangTongSanPham = document.getElementsByClassName("main-product");

function anTatCaSanPham()
{
  for(var i = 0 ; i < mangTongSanPham.length ; i++)
    mangTongSanPham[i].style.display = 'none';
}

function timSanPham()
{
  anTatCaSanPham();
  var noidung = InputTimSanPham.value;
  noidung = noidung.trim().toLowerCase();

  for(var i = 0; i < mangTongSanPham.length ; i++)
  {
    var objTenSanPham = mangTongSanPham[i].getElementsByClassName("content-product-h3")[0];
    if(objTenSanPham.innerText.toLowerCase().indexOf(noidung) != -1)
      mangTongSanPham[i].style.display = 'block';
  }
}

function phanLoaiSanPham(name) 
{
  anTatCaSanPham();
  if(name == "tat-ca")
  {
    name = "";
  }

  var mangClassName = name.split(" ");
  
  for (var i = 0; i < mangTongSanPham.length; i++) 
    for (var j = 0; j < mangClassName.length ; j++)
      if (mangTongSanPham[i].className.indexOf(mangClassName[j]) > -1)
        mangTongSanPham[i].style.display = 'block';
}

function timSanPhamNangCao()
{
  var giaBatDau = parseFloat(InputGiaBatDau.value);
  var giaKetThuc = parseFloat(InputGiaKetThuc.value);
  if(isNaN(giaBatDau) || giaBatDau < 0)
    giaBatDau = 0;
  var mucCanTim = document.getElementById("list-Muc").value;
  phanLoaiSanPham(mucCanTim);
  
  var noidung = InputTimSanPhamNangCao.value;
  noidung = noidung.trim().toLowerCase();

  for(var i = 0; i < mangTongSanPham.length ; i++)
  {
    var objTenSanPham = mangTongSanPham[i].getElementsByClassName("content-product-h3")[0];  
    var objGiaHienTai = mangTongSanPham[i].getElementsByClassName("price")[0];
    var giaHienTai = parseFloat(objGiaHienTai.innerText);

    if(objTenSanPham.innerText.toLowerCase().indexOf(noidung) == -1)
    {
      mangTongSanPham[i].style.display = 'none';
      continue;
    }
    if(isNaN(giaKetThuc))
    {
      if(giaHienTai < giaBatDau)
        mangTongSanPham[i].style.display = 'none';
    }
    else
    {
      if(giaHienTai < giaBatDau || giaHienTai > giaKetThuc)
        mangTongSanPham[i].style.display = 'none';
    }
  }
}

var mangAnhBiaChinh = new Array(
  "./img/Trangchu/biachinh1.png",
  "./img/Trangchu/biachinh2.png",
  "./img/Trangchu/biachinh3.png",
  "./img/Trangchu/biachinh4.png"
)
var DivanhBiaChinh = document.getElementById("anh-chinh");
var anhBiaChinh = DivanhBiaChinh.getElementsByTagName('img')[0];
var dem = 0;
function prev(){
    dem--;
    if( dem < 0 )
        dem = mangAnhBiaChinh.length - 1;
    anhBiaChinh.src = mangAnhBiaChinh[dem];
}
function next(){
    dem++;
    if( dem >= mangAnhBiaChinh.length )
        dem = 0;
    anhBiaChinh.src = mangAnhBiaChinh[dem];
}
setInterval(next, 4000);


var mangDanhMucCon = document.getElementsByClassName("danhMucCon");
for(var i = 0 ; i < mangDanhMucCon.length ; i++)
{
  mangDanhMucCon[i].addEventListener('click',function(){
    var link = this.getElementsByClassName("myLink")[0].href;
    window.location.assign(link);
  })
}

var mangHinhAnh = document.getElementsByClassName('img-product');
for( var i = 0; i<mangHinhAnh.length ; i++)
{
  mangHinhAnh[i].addEventListener('click', function()
  {
    var cha = this.parentElement;
    var link = cha.getElementsByTagName('a')[0].href;
    window.location.assign(link);
  });
}
var mangTenSanPham = document.getElementsByClassName('content-product-h3');
for( var i = 0; i<mangTenSanPham.length ; i++)
{
  mangTenSanPham[i].addEventListener('click', function()
  {
    var cha = this.parentElement.parentElement;
    var link = cha.getElementsByTagName('a')[0].href;
    window.location.assign(link);
  });
}




