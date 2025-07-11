import { useEffect } from 'react';
import Swal from 'sweetalert2';

const ConfirmationBox = (x) => {
  useEffect(() => {
    let x = 1
    Swal.fire({
      title: "Are you sure?",
      text: x,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }, []);

  return <div></div>;
};

export default ConfirmationBox;
