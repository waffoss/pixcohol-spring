package com.imagesharing.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    private Integer id;
    private String email;
    private String password;
    private Set<Role> roles;
    private Set<Post> favorites;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;

        this.roles = new HashSet<>();
        this.favorites = new HashSet<>();
    }

    @OneToMany
    @JoinTable(name = "user_favorites")
    public Set<Post> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<Post> favorites) {
        this.favorites = favorites;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "email",nullable = false,unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "password", length = 60,nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles")
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void addRole(Role role){
        this.roles.add(role);
    }

    @Transient
    public boolean isAdmin(){
        return this.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"));
    }

}
