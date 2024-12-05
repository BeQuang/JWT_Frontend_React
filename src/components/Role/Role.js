/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import "./Role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

function Role() {
  const childRef = useRef();
  const dataChildDefault = { url: "", description: "", isValidUrl: true };

  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;

    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let dataToPersist = [];

    Object.entries(_listChilds).forEach(([key, child]) => {
      dataToPersist.push({
        url: child.url,
        description: child.description,
      });
    });
    return dataToPersist;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      let data = buildDataToPersist();
      let response = await createRoles(data);

      if (response && response.EC === 0) {
        toast.success(response.EM);
        setListChilds({
          child1: dataChildDefault,
        });
        childRef.current.fetchListRolesAgain();
      }
    } else {
      const key = invalidObj[0];

      let _listChilds = _.cloneDeep(listChilds);
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);

      toast.error("Please input URL for all roles.");
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-role mt-3">
          <div className="title-role">
            <h4>Add a new role....</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className={`row role-child ${key}`} key={`child-${key}`}>
                  <div className="col-5 form-group">
                    <label>URL:</label>
                    <input
                      type="text"
                      className={
                        child.isValidUrl
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      value={child.url}
                      onChange={(e) =>
                        handleOnchangeInput("url", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(e) =>
                        handleOnchangeInput("description", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-2 mt-4 actions">
                    <i
                      className="fa fa-plus-circle add"
                      onClick={() => handleAddNewInput()}
                    />
                    {index > 0 && (
                      <i
                        className="fa fa-trash-o delete"
                        onClick={() => handleDeleteInput(key)}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <button
                className="btn btn-info mt-3"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="table-role mt-3">
          <h4>List Current Roles:</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
}

export default Role;
