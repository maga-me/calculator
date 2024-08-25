<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="/" class="nav__logo">
          calc
        </a>
        <btn class="nav__btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>history</title>
            <path
              d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"
            />
          </svg>
        </btn>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: #1b1b1b;
  .nav {
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__logo {
      font-size: 32px;
      color: #fff;
    }

    &__btn {
      padding: 10px;
      border-radius: 10px;
      background: #fff;
      // box-shadow:
      //   0px 15px 28px rgba(255, 255, 255, 0.2),
      //   0px 16px 30px rgba(0, 0, 0, 0.14);

      svg {
        min-height: 40px;
        max-width: 40px;
      }
    }
  }
}
</style>
