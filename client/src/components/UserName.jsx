// import React from 'react'

// function UserName({formData, setFormData, errors ,checkUsername}) {
//   return (
//     <form>
//   <div className="mb-4">
//     <label htmlFor="username" className="block text-sm font-medium formText mb-2">
//       Choose your username
//     </label>
//     <input
//       type="text"
//       id="username"
//       className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
//       placeholder="@"
//       value={formData.UserName}
//       onChange={checkUsername}
//     />
//     {/* Error message placeholder (commented out) */}
//     {errors.userName && <p className="text-xs mt-1">{errors.userName}</p>}
//   </div>
// </form>
//   )
// }

// export default UserName




// import React from 'react';

// function UserName({formData, setFormData, errors, checkUsername}) {
//   // Handle input change for username
//   const handleUsernameChange = (e) => {
//     const username = e.target.value;
//     setFormData(prev => ({ ...prev, userName: username }));
    
//     // Only check username if it's not empty
//     if (username.trim().length > 0) {
//       checkUsername(username);
//     }
//   };

//   return (
//     <form>
//       <div className="mb-4">
//         <label htmlFor="username" className="block text-sm font-medium formText mb-2">
//           Choose your username
//         </label>
//         <input
//           type="text"
//           id="username"
//           name="userName"
//           className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
//           placeholder="@"
//           value={formData.userName}
//           onChange={handleUsernameChange}
//         />
//         {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
//       </div>
//     </form>
//   );
// }

// export default UserName;




import React, { useState, useEffect } from 'react';

function UserName({formData, setFormData, errors, checkUsername}) {
  const [debounceTimer, setDebounceTimer] = useState(null);
  
  // Handle input change for username
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setFormData(prev => ({ ...prev, userName: username }));
    
    // Debounce the username check to avoid too many API calls
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Only check username if it's not empty
    if (username.trim().length > 0) {
      const timer = setTimeout(() => {
        checkUsername(username);
      }, 500); // Wait 500ms after user stops typing
      
      setDebounceTimer(timer);
    }
  };

  // Check username when component loads if there's already a username
  useEffect(() => {
    if (formData.userName && formData.userName.trim().length > 0) {
      checkUsername(formData.userName);
    }
  }, []);

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium formText mb-2">
          Choose your username
        </label>
        <input
          type="text"
          id="username"
          name="userName"
          className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
          placeholder="@"
          value={formData.userName}
          onChange={handleUsernameChange}
        />
        {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
        {!errors.userName && formData.userName && (
          <p className="text-green-500 text-xs mt-1">Username available!</p>
        )}
      </div>
    </form>
  );
}

export default UserName;