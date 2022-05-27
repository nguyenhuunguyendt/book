<template>
  <footer class="footer">
    <div class="row">
      <div class="col-sm-6 col-md-4 footer-navigation">
        <h3>
          <a href="#">BBB<span>ook</span></a>
        </h3>
        <p class="links">
          <a href="#">Home</a><strong> &middot; </strong><a href="#">Blog</a
          ><strong> &middot; </strong><a href="#">Gía</a
          ><strong> &middot; </strong><a href="#">Mô tả</a
          ><strong> &middot; </strong><a href="#">Câu hỏi</a
          ><strong> &middot; </strong><a href="#">Kết nối</a>
        </p>
        <p class="company-name">BOOK.COM &copy; 2020</p>
      </div>
      <div class="col-sm-6 col-md-4 footer-contacts">
        <div>
          <span class="fa fa-map-marker footer-contacts-icon"> </span>
          <p><span class="new-line-span">21 Revolution Street</span>NY, USA</p>
        </div>
        <div>
          <i class="fa fa-phone footer-contacts-icon"></i>
          <p class="footer-center-info email text-left">+1 9485045958</p>
        </div>
        <div>
          <i class="fa fa-envelope footer-contacts-icon"></i>
          <p><a href="#" target="_blank">nguyenhuunguyendt@gmail.com</a></p>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="col-md-4 footer-about">
        <h4>About the company</h4>
        <p>Book.com is one of the leading website for bootstrap snippets.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>



</script>
<style scoped lang='scss'>
footer {
  background-color: black;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font: bold 16px sans-serif;
  padding: 55px 50px;
  bottom: 0;
  color: #fff;
}

.footer-navigation h3 {
  margin: 0;
  font: normal 36px Cookie, cursive;
  margin-bottom: 20px;
  color: #fff;
}

.footer-navigation h3 a {
  text-decoration: none;
  color: #fff;
}

.footer-navigation h3 span {
  color: #5383d3;
}

.footer-navigation p.links a {
  color: #fff;
  text-decoration: none;
}

.footer-navigation p.company-name {
  color: #8f9296;
  font-size: 14px;
  font-weight: normal;
  margin-top: 20px;
}

@media (max-width: 767px) {
  .footer-contacts {
    margin: 30px 0;
  }
}

.footer-contacts p {
  display: inline-block;
  color: #ffffff;
  vertical-align: middle;
}

.footer-contacts p a {
  color: #5383d3;
  text-decoration: none;
}

.fa.footer-contacts-icon {
  background-color: #33383b;
  color: #fff;
  font-size: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 38px;
  margin: 10px 15px 10px 0;
}

span.new-line-span {
  display: block;
  font-weight: normal;
  display: block;
  font-weight: normal;
  font-size: 14px;
  line-height: 2;
}

.footer-about h4 {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-about p {
  line-height: 20px;
  color: #92999f;
  font-size: 13px;
  font-weight: normal;
  margin: 0;
}

div.social-links {
  margin-top: 20px;
  color: #fff;
}

.social-links a {
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: #33383b;
  border-radius: 2px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.footer {
  bottom: 0;
}

body {
  background: #eee;
}
</style>
