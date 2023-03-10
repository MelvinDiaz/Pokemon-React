import "./footer.css";
import Swal from "sweetalert2";

const Footer = () => {
  const handleClick = () => {
    Swal.fire({
      title: "<h1>Contributions</h1>",   
      html: '<a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">Pokemon icons created by Nikita Golubev - Flaticon</a>',
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  };
  return (
    <footer>
      <button className="button" onClick={handleClick}>
        Contributions
      </button>
    </footer>
  );
};
//

export default Footer;
