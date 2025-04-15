import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import { motion } from "framer-motion"; // ✅ import animation

const testimonialList = [
  {
    author: {
      fullName: "Oleksander Reynold",
      picture: "https://cdn.easyfrontend.com/pictures/users/user2.jpg",
      designation: "Founder / CEO",
    },
    rating: 3.5,
    description:
      "InterVault has completely changed the way I save and invest. The app is intuitive, and customer support is top-notch!",
  },
  {
    author: {
      fullName: "Raima Sen",
      picture: "https://cdn.easyfrontend.com/pictures/users/user3.jpg",
      designation: "Business Head",
    },
    rating: 3.8,
    description:
      "With InterVault, managing business finances has never been easier. Secure, fast, and very user-friendly.",
  },
  {
    author: {
      fullName: "Arjun Kapur",
      picture: "https://cdn.easyfrontend.com/pictures/users/user27.jpg",
      designation: "UI Designer",
    },
    rating: 4.5,
    description:
      "Love the clean UI and seamless banking experience. It really feels like banking for the future!",
  },
];

const Rating = ({ rating, showLabel, className, ...rest }) => (
  <p className={classNames("mb-6", className)} {...rest}>
    <span>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";
        if (index <= Math.floor(rating))
          content = <FontAwesomeIcon icon={faStar} className="text-yellow-500" />;
        else if (rating > i && rating < index + 1)
          content = <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />;
        else if (index > rating)
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-200 dark:text-opacity-20"
            />
          );

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    {showLabel && <span>{rating.toFixed(1)}</span>}
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

const TestimonialItem = ({ testimonial }) => (
  <motion.div
    className="bg-white shadow-xl dark:bg-slate-800 rounded-2xl transition duration-300 h-full p-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="mt-4">
      <Rating rating={testimonial.rating} showLabel={false} />
      <p className="opacity-50 mb-6">{testimonial.description}</p>
      <div className="flex items-center">
        <div className="mr-2">
          <img
            src={testimonial.author.picture}
            alt={testimonial.author.fullName}
            className="max-w-full h-auto rounded-full border"
            width="47"
          />
        </div>
        <div>
          <h4 className="text-xl font-medium">{testimonial.author.fullName}</h4>
          <p className="text-sm">
            <i>{testimonial.author.designation}</i>
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

TestimonialItem.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

const Testimonial1 = () => {
  return (
    <section className="ezy__testimonial1 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center md:mb-6">
          <div className="sm:max-w-lg text-center">
            <h2 className="text-3xl leading-none md:text-[45px] font-bold mb-4">
              Community Reviews
            </h2>
            <p>
              It’s easier to reach your savings goals when you have the right
              savings account. Take a look and find the right one for you!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6 pt-8">
          {testimonialList.map((testimonial, i) => (
            <div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
              <TestimonialItem testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial1;
