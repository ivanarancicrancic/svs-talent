package com.seavus.libraryEntity.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Book{
    private int id;
    private String name;
    private List<User> users;

    public Book() {

    }
    public Book(String name) {
        this.name = name;
    }

    public Book(String name, List<User> users){
        this.name = name;
        this.users = users;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "book_user", joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        String result = String.format(
                "Book [id=%d, name='%s']%n",
                id, name);
        if (users != null) {
            for(User user : users) {
                result += String.format(
                        "User[id=%d, name='%s', surname='%s']%n",
                        user.getId(), user.getName(), user.getSurname());
            }
        }

        return result;
    }
}