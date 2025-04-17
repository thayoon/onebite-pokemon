export default function Header({
  $app,
  initialState,
  handleClick,
  handleSearch,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  $app.appendChild(this.$target);
  this.handleClick = handleClick;
  this.handleSearch = handleSearch;

  this.template = () => {
    const { searchWord, currentPage } = this.state;
    let temp = `<div class='header-content' id="title">
      <img src='/src/img/ball.webp' width=40px height=40px></img>
      포켓몬 도감</div>`;

    if (!currentPage.includes("/detail")) {
      temp += `<div class="search">
          <input type="text" placeholder="포켓몬을 검색하세요!" id="search" autocomplete="off" value=${decodeURIComponent(
            searchWord
          )}></input>
          <button id="search-button"><img src="src/img/search.png"></img></button>
      </div>`;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    document.getElementById("title").addEventListener("click", () => {
      this.handleClick();
    });

    if (!this.state.currentPage.includes("/detail")) {
      const $searchInput = document.getElementById("search");
      $searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.handleSearch($searchInput.value);
        }
      });
      const $searchBtn = document.getElementById("search-button");
      $searchBtn.addEventListener("click", () => {
        this.handleSearch($searchInput.value);
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
