import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ id, title, author, cover, externalLink, onEdit, onDelete }) => {
  const Wrapper = externalLink ? 'a' : Link;
  const wrapperProps = externalLink
    ? {
        href: externalLink,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {
        to: `/book/${id}`,
      };

  return (
    <div className="relative bg-white rounded-lg shadow p-4 hover:shadow-lg transition block">
      <Wrapper {...wrapperProps}>
        <div className="w-full h-64 flex items-center justify-center bg-[#f9f9f9] rounded mb-2">
          <img
            src={cover}
            alt={title}
            className="max-h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-[#9E122C]">{title}</h3>
        <p className="text-gray-600">{author}</p>
      </Wrapper>

      {(onEdit || onDelete) && (
        <div className="mt-2 flex space-x-2 justify-center">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="bg-yellow-400 text-black px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
