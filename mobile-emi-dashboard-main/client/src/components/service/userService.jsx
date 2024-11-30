// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`/getAllUserDetails`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await fetch(`/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Parse the JSON response and include `ok` status
    const result = await response.json();
    return { ok: response.ok, ...result };
  } catch (error) {
    console.error('Error adding user:', error);
    return { ok: false, error: 'An unexpected error occurred.' };
  }
};




export const fetchUserById = async (id) => {
  const response = await fetch(`/getUserDetails/${id}`);
  // console.log(response);
  
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};



// Add a device to an existing user
export const addDevice = async (id, deviceData) => {
  const response = await fetch(`/addDevice/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to add device");
  }
  return await response.json();
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`/deleteUser/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const loginU = async (credentials) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'credentials': "include"
      
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();  // Expecting token and role
  return { token: data.token, role: data.role };  // Return both token and role
};



// Create a new admin
export const createAdmin = async (adminData) => {
  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...adminData, role: "admin" }), // Role is hardcoded for admin creation
    });

    if (!response.ok) {
      throw new Error("Failed to create admin");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// userService.js
export const createTeamMember = async (teamMemberData) => {
  try {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage
    const response = await fetch("/createTeamMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify(teamMemberData),
    });

    if (!response.ok) {
      throw new Error("Failed to create team member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating team member:", error);
    throw error;
  }
};


export const checkSession = async () => {
  const response = await fetch("/check-session", {
    method: "GET",
    credentials: "include", // Important: ensures cookies are included
  });

  if (response.ok) {
    const data = await response.json();
    return data; // Expecting { role: 'admin' or 'member' }
  } else {
    throw new Error("Session expired or not authenticated");
  }
};

export const updateEmiStatus = async (emiId, newStatus) => {
  const response = await fetch(`/updateEmiStatus/${emiId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update EMI status");
  }

  return response.json();
};


export const logoutUser = async () => {
  const response = await fetch("/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
