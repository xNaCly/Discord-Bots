<nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
	<div class="container">
		<a class="navbar-brand" onclick="home()" href="#">
			<img
				src="src/img/bot_logo.png"
				height="30"
				class="d-inline-block align-top"
			/>
			Odium
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item ">
					<a
						class="nav-link"
						href="https://discord.gg/J4CN9Wv"
						target="_BLANK"
						>Support</a
					>
				</li>
			</ul>
		</div>
		<form class="form-inline my-2 my-lg-0">
			<div class="dropdown">
				<button
					class="btn btn-primary"
					type="button"
					onclick="doLogin(this)"
					id="accountDropdownButton"
					data-toggle="dropdown"
				>
				<i class="fas fa-user"></i>&nbsp;
					Login
				</button>
				<div class="dropdown-menu" id="accountDropdown">
					<a class="dropdown-item" href="#" onclick="guildList()"
						>Server List</a
					>
					<a class="dropdown-item" href="#" onclick="refresh(this)">
					<i class="fas fa-sync pointer"></i> Refresh
					</a>
					<a class="dropdown-item" href="#" onclick="logout()"
						>Logout</a
					>
				</div>
			</div>
		</form>
	</div>
</nav>
