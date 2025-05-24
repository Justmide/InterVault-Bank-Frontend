import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfirmSubmitWrapper = ({
  children,
  onValidSubmit,
  onCancelEdit,
  confirmTitle = "Are you sure?",
  confirmText = "Do you want to submit this form?",
  confirmButtonText = "Yes, submit it!",
  cancelButtonText = "No, go back",
  successTitle = "Hold on...",
  successText = "Submitting all your information",
  cancelTitle = "Cancelled",
  cancelText = "You can keep editing.",
  navigateTo = "/loading",
}) => {
  const navigate = useNavigate();

  const handleValidSubmit = async (formData, event) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ml-3',
        cancelButton:
          'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-red-400',
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwindButtons.fire({
      title: confirmTitle,
      text: confirmText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // Call the onValidSubmit function with the form data
        await onValidSubmit(formData);

        await swalWithTailwindButtons.fire({
          title: successTitle,
          text: successText,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        if (navigateTo) {
          navigate(navigateTo); 
        }
      } catch (error) {
        console.error("Error during submission:", error);
        Swal.fire({
          title: "Error",
          text: error?.message || "Something went wrong during submission.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: cancelTitle,
        text: cancelText,
        icon: 'info',
        showConfirmButton: false,
        timer: 1200,
      });

      onCancelEdit && onCancelEdit(); // Call the cancel edit handler if provided
    }
  };

  return (
    <>
      {typeof children === 'function' 
        ? children(handleValidSubmit) 
        : React.cloneElement(children, { onClick: (e) => handleValidSubmit({}, e) }) // Pass form data dynamically here
      }
    </>
  );
};

ConfirmSubmitWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  onValidSubmit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func,
  confirmTitle: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  successTitle: PropTypes.string,
  successText: PropTypes.string,
  cancelTitle: PropTypes.string,
  cancelText: PropTypes.string,
  navigateTo: PropTypes.string,
};

export default ConfirmSubmitWrapper;
